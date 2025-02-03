import ActionsEnum from './Actions.js';

function getSequence(...lastActions) {
    const convertedActions = lastActions.map(value => {
        const action = Object.entries(ActionsEnum).find(([key, val]) => val === value);
        return action ? { key: action[0], value: action[1] } : null;
    }).filter(action => action !== null);

    const start = convertedActions.reduce((sum, action) => sum + action.value, 0);
    let actions = calculateSequence(start);
    
    actions.push(...convertedActions);
    return actions;
}

function calculateSequence(start) {
    let memoization = new Map();
    let parent = new Map();
    return calculateIterativeSequence(start, memoization, parent);
}

function calculateIterativeSequence(start, memoization, parent) {
    let queue = [start];

    while (queue.length > 0) {
        let actualPoint = queue.shift();

        for (let { key, value } of ActionsEnum.getSequenceActions()) {
            let nextPoint = actualPoint + value;

            if (!memoization.has(nextPoint)) {
                queue.push(nextPoint);

                let actualSequence = [{ key, value }];
                
                if (memoization.has(actualPoint)) {
                    actualSequence.push(...memoization.get(actualPoint));
                }

                memoization.set(nextPoint, actualSequence);
                parent.set(nextPoint, actualPoint);

                if (nextPoint === 0) {
                    return actualSequence;
                }
            }
        }
    }

    return [];
}

export { getSequence, calculateSequence };
