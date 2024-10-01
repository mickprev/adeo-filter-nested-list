function countDepth(data) {
    data.forEach((country) => {
        country.name += ` [${country.people?.length | 0}]`;

        country.people?.forEach((person) => {
            person.name += ` [${person.animals?.length | 0}]`;
        });
    });
}

module.exports = {
    countDepth
}
