import axios from 'axios'

type TsConfigType = {
    compilerOptions: {
        module: string,
        lib: string[],
        strict: boolean
    }
}

const main = async () => {
    const url = 'https://raw.githubusercontent.com/axios/axios/master/tsconfig.json'
    const { data } = await axios.get<TsConfigType>(url)
    console.log(data.compilerOptions.module)
    console.log(data.compilerOptions.lib.map(lib => lib.toUpperCase()))
    console.log(data.compilerOptions.strict)
}

void main()
