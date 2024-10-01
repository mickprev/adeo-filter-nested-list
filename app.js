const strangeDataRepository = require('./repository/strange-data.repository');
const commandOptionsService = require('./service/command-options.service');
const commandOptionsEnum = require('./enum/command-options.enum');
const {countDepth} = require('./helper/strange-data.helper');

function main() {
    if (commandOptionsService.getOption(commandOptionsEnum.HELP)) {
        console.log(
            `Usage: node app.js [options]
            Options:
            --count: Count the number of items
            --filter: Filter the list of countries, people, and animals based on a pattern in animal names. Example: --filter=pony`
        );

        process.exit(0);
    }

    if (commandOptionsService.hasInvalidOptions(Object.values(commandOptionsEnum))) {
        console.error('Invalid options. Please use --help for more information.');

        process.exit(1);
    }

    const filterOption = commandOptionsService.getOption(commandOptionsEnum.FILTER);
    const strangeData = filterOption ? strangeDataRepository.findByAnimals(filterOption) : strangeDataRepository.findAll();

    if (!strangeData?.length) {
        process.exit(0);
    }

    const countOption = commandOptionsService.getOption(commandOptionsEnum.COUNT);

    if (countOption) {
        countDepth(strangeData);
    }

    console.log(JSON.stringify(strangeData, null, 2));
}

main()
