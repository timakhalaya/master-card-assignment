import multer from "multer";

/**
Function does the processing of chunks (paranthesis)
characters - string
 */
type closeChars = '}' | ']' | '>' | ')'

const validateOnlyLetterAndNumbers = (testString: string): boolean =>{
    return /[A-Za-z0-9]/g.test(testString)
}

const INVALID_MESSAGE = 'Invalid string provided for a check'

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

// Set up storage for uploaded files
const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, '.');
  },
  filename: (_req, file, cb) => {
    cb(null, file.originalname);
  }
});

// Create the multer instance
export const upload = multer({ storage: storage });
