const fs = require('fs');
const path = require('path');

// Path to the user's package.json (the project where the package is linked)
const packageJsonPath = path.join(process.cwd(), 'package.json');

function addPrestartScript() {
    if (fs.existsSync(packageJsonPath)) {
        const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

        // Ensure "scripts" exists
        packageJson.scripts = packageJson.scripts || {};

        // Add "prestart" if it doesn't already exist
        if (!packageJson.scripts.prestart) {
            packageJson.scripts.prestart = "node node_modules/motivational-quotes";
            fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
            console.log('✨ Added prestart script to display motivational message!');
        }
    }
}

addPrestartScript();
