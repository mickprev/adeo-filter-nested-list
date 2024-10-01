const {cli} = require('./cli');
const {data} = require('../../data/data');

describe('App', () => {
    it('displays all results', async () => {
        // When I run the app without options
        const command = 'node';
        const args = ['app.js'];
        const env = {};

        const result = await cli(command, args, env);

        // Then I should see all the results
        expect(result.status).toBe(0);
        expect(result.stdout).not.toEqual('');
        expect(JSON.parse(result.stdout)).toEqual(data);
    })

    it('counts the results in depth', async () => {
        // When I run the app with the count option
        const command = 'node';
        const args = ['app.js', '--count'];
        const env = {};

        const result = await cli(command, args, env);

        // Then I should see the results with the depth count
        expect(result.status).toBe(0);
        expect(result.stdout).toContain('Dillauti [5]');
        expect(result.stdout).toContain('Winifred Graham [6]');
        expect(result.stdout).toContain('Blanche Viciani [8]');
    });

    it('filters the results', async () => {
        // When I run the app with the filter option
        const command = 'node';
        const args = ['app.js', '--filter=ry'];
        const env = {};

        const result = await cli(command, args, env);

        // Then I should see the results with the filter applied
        expect(result.status).toBe(0);
        expect(result.stdout).not.toEqual('');
        expect(JSON.parse(result.stdout)).toEqual([
            {
                name: 'Uzuzozne',
                people: [
                    {
                        name: 'Lillie Abbott',
                        animals: [
                            {
                                name: 'John Dory'
                            }
                        ]
                    }
                ]
            },
            {
                name: 'Satanwi',
                people: [
                    {
                        name: 'Anthony Bruno',
                        animals: [
                            {
                                name: 'Oryx'
                            }
                        ]
                    }
                ]
            }
        ])
    });

    it('displays no results', async () => {
        // When I run the app with a filter that doesn't match any results
        const command = 'node';
        const args = ['app.js', '--filter=invalid'];
        const env = {};

        const result = await cli(command, args, env);

        // Then I should see no results
        expect(result.status).toBe(0);
        expect(result.stdout).toBe('');
    });

    it('displays help', async () => {
        // When I run the app with the help option
        const command = 'node';
        const args = ['app.js', '--help'];
        const env = {};

        const result = await cli(command, args, env);

        // Then I should see the help message
        expect(result.status).toBe(0);
        expect(result.stdout).toContain('Usage: node app.js [options]');
    });

    it('returns exit code 1 for invalid options', async () => {
        // When I run the app with invalid options
        const command = 'node';
        const args = ['app.js', '--invalid'];
        const env = {};

        const result = await cli(command, args, env);

        // Then I should see the error message
        expect(result.status).toBe(1);
        expect(result.stderr).toContain('Invalid options');
    });
});
