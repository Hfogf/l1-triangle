#!/usr/bin/env node

/**
 * PRE-PUSH CHECKLIST
 * Vérifier que tout est prêt pour GitHub
 */

const fs = require('fs');
const path = require('path');

console.log('📋 PRE-PUSH CHECKLIST L1-TRIANGLE\n');

const checks = [
  {
    name: 'index.html existe',
    fn: () => fs.existsSync('index.html')
  },
  {
    name: 'admin.html existe',
    fn: () => fs.existsSync('admin.html')
  },
  {
    name: 'server.js existe',
    fn: () => fs.existsSync('server.js')
  },
  {
    name: 'package.json existe',
    fn: () => fs.existsSync('package.json')
  },
  {
    name: 'hero-video.mp4 existe',
    fn: () => fs.existsSync('hero-video.mp4')
  },
  {
    name: 'css/styles.css existe',
    fn: () => fs.existsSync('css/styles.css')
  },
  {
    name: 'js/api.js existe',
    fn: () => fs.existsSync('js/api.js')
  },
  {
    name: 'js/site.js existe',
    fn: () => fs.existsSync('js/site.js')
  },
  {
    name: 'data/products.json existe',
    fn: () => fs.existsSync('data/products.json')
  },
  {
    name: 'data/orders.json existe',
    fn: () => fs.existsSync('data/orders.json')
  },
  {
    name: 'README.md existe',
    fn: () => fs.existsSync('README.md')
  },
  {
    name: 'Fichier vidéo ancien supprimé',
    fn: () => !fs.existsSync('Hailuo_Video__I want you to create a visual_448266720662994952 (1).mp4')
  },
  {
    name: 'index.html contient hero-video.mp4',
    fn: () => {
      const content = fs.readFileSync('index.html', 'utf8');
      return content.includes('hero-video.mp4');
    }
  },
  {
    name: 'Téléphone au bon format',
    fn: () => {
      const content = fs.readFileSync('index.html', 'utf8');
      return content.includes('+509 3994 5794') && content.includes('tel:+50939945794');
    }
  },
  {
    name: 'Données produits non vides',
    fn: () => {
      const products = JSON.parse(fs.readFileSync('data/products.json', 'utf8'));
      return Object.keys(products).length > 0;
    }
  },
  {
    name: '.gitignore ne contient pas data/',
    fn: () => {
      const content = fs.readFileSync('.gitignore', 'utf8');
      return !content.includes('data/');
    }
  }
];

let passed = 0;
let failed = 0;

checks.forEach(check => {
  try {
    const result = check.fn();
    if (result) {
      console.log(`✅ ${check.name}`);
      passed++;
    } else {
      console.log(`❌ ${check.name}`);
      failed++;
    }
  } catch (err) {
    console.log(`❌ ${check.name} (erreur: ${err.message})`);
    failed++;
  }
});

console.log(`\n📊 Résultats: ${passed}/${checks.length} ✅`);

if (failed === 0) {
  console.log('\n🚀 TOUT EST PRÊT POUR LE PUSH GITHUB!');
  console.log('\nCommandes:\n');
  console.log('  git add -A');
  console.log('  git commit -m "v1.0: Corrections et optimisations complètes"');
  console.log('  git push origin main');
  process.exit(0);
} else {
  console.log('\n⚠️ Il y a encore des problèmes à régler!');
  process.exit(1);
}
