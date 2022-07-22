import * as PropertyFormat from "./PropertyFormat"

let animatorGroupFormatList:{[name:string]:Array<PropertyFormat.PropertyFormatClass>} = {}

animatorGroupFormatList["standard"] = [
    new PropertyFormat.PropertyFormat_margin()
]
