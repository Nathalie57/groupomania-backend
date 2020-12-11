// function ucFirst(value) {
//     return (value+'').charAt(0).toUpperCase();
// }

function ucFirst(string) 
{
    return string.charAt(0).toUpperCase() + string.slice(1);
}

export default {
    ucFirst
};