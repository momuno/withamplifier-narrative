#!/usr/bin/env npx tsx
/**
 * Validate Community Showcase URLs
 * 
 * Checks that all URLs in the showcase data are accessible.
 * Run before deployment to catch broken links.
 * 
 * Usage: npm run validate:showcase
 */

import { showcaseItems, ShowcaseItem } from '../data/community-showcase';

interface ValidationResult {
  item: string;
  url: string;
  status: 'ok' | 'error';
  httpCode?: number;
  error?: string;
}

async function checkUrl(url: string): Promise<{ ok: boolean; code: number }> {
  try {
    const response = await fetch(url, { 
      method: 'HEAD', 
      redirect: 'follow',
      signal: AbortSignal.timeout(10000) // 10 second timeout
    });
    return { ok: response.ok, code: response.status };
  } catch (error) {
    return { ok: false, code: 0 };
  }
}

function validateRequiredFields(item: ShowcaseItem): string[] {
  const errors: string[] = [];
  if (!item.name) errors.push('missing name');
  if (!item.type) errors.push('missing type');
  if (!item.description) errors.push('missing description');
  if (!item.author) errors.push('missing author');
  if (!item.repoUrl) errors.push('missing repoUrl');
  if (!item.authorAvatar) errors.push('missing authorAvatar');
  return errors;
}

async function validateShowcase(): Promise<void> {
  console.log('🔍 Validating community showcase...\n');
  console.log(`Found ${showcaseItems.length} items to validate\n`);
  
  const results: ValidationResult[] = [];
  let hasErrors = false;

  for (const item of showcaseItems) {
    // Check required fields
    const fieldErrors = validateRequiredFields(item);
    if (fieldErrors.length > 0) {
      results.push({
        item: item.name || 'UNNAMED',
        url: item.repoUrl || 'MISSING',
        status: 'error',
        error: `Missing fields: ${fieldErrors.join(', ')}`
      });
      console.log(`❌ ${item.name || 'UNNAMED'} - ${fieldErrors.join(', ')}`);
      hasErrors = true;
      continue;
    }

    // Check URL accessibility
    process.stdout.write(`   Checking ${item.name}...`);
    const { ok, code } = await checkUrl(item.repoUrl);
    
    if (ok) {
      results.push({ item: item.name, url: item.repoUrl, status: 'ok', httpCode: code });
      console.log(`\r✅ ${item.name}`);
    } else {
      results.push({ item: item.name, url: item.repoUrl, status: 'error', httpCode: code });
      console.log(`\r❌ ${item.name} → HTTP ${code}`);
      console.log(`   ${item.repoUrl}`);
      hasErrors = true;
    }
  }

  // Summary
  const passed = results.filter(r => r.status === 'ok').length;
  const failed = results.filter(r => r.status === 'error').length;

  console.log('\n' + '='.repeat(50));
  console.log(`Total:  ${results.length}`);
  console.log(`Valid:  ${passed}`);
  console.log(`Broken: ${failed}`);
  console.log('='.repeat(50));

  // Stats by type
  const types = Array.from(new Set(showcaseItems.map(i => i.type)));
  console.log('\nBy type:');
  for (const type of types) {
    const count = showcaseItems.filter(i => i.type === type).length;
    console.log(`  ${type}: ${count}`);
  }

  // Stats by author
  const authors = Array.from(new Set(showcaseItems.map(i => i.author)));
  console.log('\nBy author:');
  for (const author of authors) {
    const count = showcaseItems.filter(i => i.author === author).length;
    console.log(`  ${author}: ${count}`);
  }

  console.log('');

  if (hasErrors) {
    console.log('❌ VALIDATION FAILED - Fix broken URLs before deploying\n');
    process.exit(1);
  } else {
    console.log('✅ All URLs valid - Ready to deploy\n');
    process.exit(0);
  }
}

// Run validation
validateShowcase().catch(error => {
  console.error('Validation script error:', error);
  process.exit(1);
});
