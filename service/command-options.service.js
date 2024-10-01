class CommandOptionsService {
    #options;

    constructor() {
        this.#options = this.parseOptions();
    }

    parseOptions() {
        const args = process.argv.slice(2);
        const options = {};

        args.forEach(arg => {
            const [key, value] = arg.split('=');
            if (key.startsWith('--')) {
                options[key.slice(2)] = value || true;
            }
        });

        return options;
    }

    getOption(key) {
        return this.#options[key];
    }

    hasInvalidOptions(allowedOptions) {
        const options = Object.keys(this.#options);
        return options.some(option => !allowedOptions.includes(option));
    }
}

module.exports = new CommandOptionsService();
