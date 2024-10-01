const {spawn} = require('child_process');

async function cli(command, args = [], env = {}) {
    return new Promise((resolve, reject) => {
        const child = spawn(command, args, {env: {...process.env, ...env}});

        let stdout = '';
        let stderr = '';

        child.stdout.on('data', (data) => {
            stdout += data;
        });

        child.stderr.on('data', (data) => {
            stderr += data;
        });

        child.on('close', (status) => {
            resolve({stdout, stderr, status});
        });

        child.on('error', (error) => {
            reject({stdout, stderr, status: null, error});
        });
    });
}

module.exports = {cli};
