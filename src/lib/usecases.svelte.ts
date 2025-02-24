    export interface UsecaseInfo {
        index: number, 
        title: string, 
        text: string
    }

    let usecasesList: UsecaseInfo[] = $state([]);

    export function getUsecases()
    {
        sortCases();
        return usecasesList;
    }

    export async function loadUsecases()
    {
        usecasesList = await getAllUsecasesFromDatabase();
    }

    export function addUsecase(usecase: UsecaseInfo)
    {
        usecasesList.push(usecase);

        //TODO: Add usecase to database
    }

    export function addUsecases(usecases: Array<UsecaseInfo>)
    {
        usecasesList = [...usecasesList, ...usecases];

        //TODO: Add usecase to database
    }

    function sortCases()
    {
        usecasesList = usecasesList.sort((a: UsecaseInfo, b: UsecaseInfo) => {
            return a.index - b.index;
        });
    }

    /**
     * Fetches all the Usecases from the google sheets database
     * 
     * @returns Array<UsecaseInfo>
     */
    export async function getAllUsecasesFromDatabase(): Promise<UsecaseInfo[]>
    {
        try {
            const res = await fetch('/api/usecases');
            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }

            const data = await res.json();
        
            usecasesList = data.map((item: any) => ({
                index: item[0],
                title: item[1],
                text: item[2]
            }));
        } catch (err) {
            console.error("Error fetching usecases:", err);
        }

        return usecasesList;
    }

    export async function addUsecaseToDatabase(usecase: UsecaseInfo)
    {
        console.log(`Adding Use Case: ${usecase.title}`);

        usecasesList.push(usecase);

        const response = await fetch('/api/usecases', {
            method: 'POST',
            body: 'Test to post!'
        });
    }