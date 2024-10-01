describe('Strange Data Repository', () => {
    describe('findByAnimals', () => {
        it('handles the case where data contains countries without people', async () => {
            // Given I have country data without people
            jest.mock('../data/data.js', () => ({
                data: [
                    {
                        name: 'MockCountry'
                    }
                ]
            }));

            // When I call findByAnimals
            const strangeDataRepository = require('./strange-data.repository');
            const result = strangeDataRepository.findByAnimals('MockAnimal');

            // Then I should see an empty array
            expect(result).toEqual([]);
        });

        it('handles the case where data contains countries and people without animals', async () => {
            // Given I have country and people data without animals
            jest.mock('../data/data.js', () => ({
                data: [
                    {
                        name: 'MockCountry',
                        people: [
                            {
                                name: 'MockPerson'
                            }
                        ]
                    }
                ]
            }));

            // When I call findByAnimals
            const strangeDataRepository = require('./strange-data.repository');
            const result = strangeDataRepository.findByAnimals('MockAnimal');

            // Then I should see an empty array
            expect(result).toEqual([]);
        });
    });
});
