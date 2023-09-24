const INVALID_MESSAGE = 'Invalid string provided for a check';
type closeChars = '}' | ']' | '>' | ')'

/**
Function does the processing of chunks (paranthesis)
characters - string
 */

const validateOnlyLetterAndNumbers = (testString: string): boolean =>{
    return /[A-Za-z0-9]/g.test(testString)
}

export const processValidCharacters = (characters: string)=>{
    if(!characters){
        return INVALID_MESSAGE;
    }
    if(validateOnlyLetterAndNumbers(characters)){
        return INVALID_MESSAGE;
    }
    const openCharacters = ['[','<','(','{'];

    const closingMatch = {
        '}':'{',
        ']':'[',
        '>':'<',
        ')':'('
    }

    const validOpeningCharacters: string[] = [];
    const invalidIndex = -1;

    for(let char=0; char < characters.length; char++){
        const currentChar = characters[char];
        const isOpening = openCharacters.includes(currentChar);
       
        if(char === 0 && !isOpening){
            return 0;
        }

        if(isOpening){
            validOpeningCharacters.push(currentChar);
        }

        if(!isOpening){
            const matchingOpening = closingMatch[currentChar as closeChars];
            const validOpenBefore = validOpeningCharacters.pop()
            if(validOpenBefore !== matchingOpening){
                return char;
            }
        }
    

    }
    return invalidIndex;
}