const { execSync } = require("child_process");
const path = require("path");
const fs = require("fs");

const NVM_DIR =
  // process.env.NVM_DIR ||
  process.env.NVM_HOME ||
  path.join(process.env.HOME || process.env.USERPROFILE, ".nvm");
const NVM_NODEJS_ORG_MIRROR =
  process.env.NVM_NODEJS_ORG_MIRROR || "https://nodejs.org/dist";
console.log("NVM_DIR", NVM_DIR);
function getCurrentVersion() {
  const currentPath = path.join(NVM_DIR, "current");
  if (fs.existsSync(currentPath)) {
    return fs.readFileSync(currentPath, "utf-8").trim();
  }
  return null;
}

function listVersions() {
  const versions = fs
    .readdirSync(path.join(NVM_DIR)) //"versions", "node"
    .filter(
      (version: string) => !version.startsWith(".") && version.startsWith("v")
    );
  return versions;
}

function installNode(version: any) {
  const installPath = path.join(NVM_DIR, "versions", "node", version);
  if (!fs.existsSync(installPath)) {
    const downloadUrl = `${NVM_NODEJS_ORG_MIRROR}/v${version}/node-v${version}-x64.msi`;
    const installCommand = `powershell -Command "Invoke-WebRequest -Uri ${downloadUrl} -OutFile node.msi; Start-Process msiexec -ArgumentList '/i', 'node.msi', '/qn', '/quiet' -Wait; Remove-Item node.msi"`;
    execSync(installCommand, { stdio: "inherit" });
  }
}

function useNode(version: any) {
  const installPath = path.join(NVM_DIR, "versions", "node", version);
  if (fs.existsSync(installPath)) {
    const currentPath = path.join(NVM_DIR, "current");
    fs.writeFileSync(currentPath, installPath);
    console.log(`Now using Node.js version ${version}`);
  } else {
    console.error(`Node.js version ${version} is not installed.`);
  }
}

function main(code: string, Version?: string, alert?: any) {
  const command = code;
  const version = Version;
  let result: any;
  switch (command) {
    case "install":
      installNode(version);
      break;
    case "use":
      useNode(version);
      break;
    case "list":
      console.log("Installed Node.js versions::");
      listVersions().forEach((v: string) => {
        if (!result) {
          result = [];
        }
        result.push(v);
        console.log(`版本- ${v}`);
      });
      break;
    case "current":
      const currentVersion = getCurrentVersion();
      if (currentVersion) {
        console.log(`Currently using Node.js version ${currentVersion}`);
      } else {
        console.log("No version is currently in use.");
      }
      break;
    default:
      console.error(
        "Unknown command. Supported commands: install, use, list, current"
      );
      process.exit(1);
  }
  return result;
}

export default main;
