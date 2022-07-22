export const textJoinAnimatorGroup = (textArray:Array<string>) => {
    let textTemp = "";
    for (let i = 0 ; i < textArray.length ; i ++){
        textTemp += textArray[i] + " "
    }
    return textTemp;
}