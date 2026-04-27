import fs from 'fs';
const path = 'src/app/admin-dashboard.ts';
let code = fs.readFileSync(path, 'utf8');
code = code.replace(/<label /g, '<div ');
code = code.replace(/<\/label>/g, '<\/div>');
code = code.replace(/} catch \{\n         \}/g, '} catch { /* ignore */ }');
fs.writeFileSync(path, code);
