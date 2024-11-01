const fs =  require('fs');
const path = require('path');
const chokidar =  require('chokidar');
const glob =  require('glob');
const config = require('./Mcass.config.js');
const mappings = require('./utilityMappings.js');

const generatedClasses = new Set();
const cssFilePath = path.join(__dirname, 'dist', 'csslib.css');

// Fetch all predefined classes from the CSS file
const predefinedClasses = new Map(
  // Array.from(fs.readFileSync('dist/csslib.css', 'utf-8').matchAll(/\.(\w[\w-]*)\s*{([^}]*)}/g), m => [m[1], m[2].trim()])
  Array.from(fs.readFileSync(cssFilePath, 'utf-8').matchAll(/\.(\w[\w-]*)\s*{([^}]*)}/g), m => [m[1], m[2].trim()])
);

const generateCss = (className) => {
  let responsivePrefix = '';
  let pseudoClass = '';
  let originalClassName = className;

  // Check for responsive prefix
  for (const prefix in mappings.responsiveBreakpoints) {
    if (className.startsWith(prefix)) {
      responsivePrefix = prefix;
      className = className.slice(prefix.length);
      break;
    }
  }

  // Check for pseudo prefix
  for (const prefix in mappings.pseudoClasses) {
    if (className.startsWith(prefix)) {
      pseudoClass = mappings.pseudoClasses[prefix];
      className = className.slice(prefix.length);
      break;
    }
  }

  // Handle predefined class case
  if (predefinedClasses.has(className)) {
    const escapedClassName = originalClassName.replace(/:/g, '\\:');
    const cssRule = `.${escapedClassName}${pseudoClass} { ${predefinedClasses.get(className)} }`;

    if (responsivePrefix) {
      return `${mappings.responsiveBreakpoints[responsivePrefix]} { .${escapedClassName} { ${predefinedClasses.get(className)} } }`;
    }

    return cssRule;
  }

  // Handle arbitrary classes
  const utility = Object.keys(mappings.utilities).find(key => className.startsWith(key));
  if (!utility) return '';

  const value = className.slice(utility.length);
  const cssProperty = mappings.utilities[utility];
  const escapedClassName = originalClassName.replace(/:/g, '\\:');
  const cssRule = `.${escapedClassName}${pseudoClass} { ${cssProperty}: ${value}; }`;

  return responsivePrefix ? `${mappings.responsiveBreakpoints[responsivePrefix]} { ${cssRule} }` : cssRule;
};

function appendCss(css) {
  const outputPath = path.join(__dirname, 'dist', 'csslib.css');
  fs.appendFileSync(outputPath, css);
}

function processFileContent(content) {
  const matches = content.match(/class=["']([^"']*)["']/g);

  if (matches) {
    const classNamesSet = new Set();

    matches.forEach((match) => {
      const classNames = match.replace(/class=["']/g, '').replace(/["']/g, '').split(' ');
      classNames.forEach((className) => {
        if (className.trim()) {
          classNamesSet.add(className);
        }
      });
    });

    classNamesSet.forEach((className) => {
      if (className.trim() && !generatedClasses.has(className)) {
        const css = generateCss(className);
        if (css) {
          appendCss(css);
          generatedClasses.add(className);
        }
      }
    });
  }
}

function initialScan() {
  config.content.forEach((filePathPattern) => {
    const files = glob.sync(filePathPattern);

    files.forEach((filePath) => {
      const content = fs.readFileSync(filePath, 'utf-8');
      processFileContent(content);
    });
  });

  console.log('Initial scan complete. Watching for changes...');
}

function startWatcher() {
  const watcher = chokidar.watch(config.content, { ignoreInitial: true });

  watcher.on('change', (filePath) => {
    const content = fs.readFileSync(filePath, 'utf-8');
    processFileContent(content);
  });

  console.log('Watching for class changes...');
}

initialScan();
startWatcher();



