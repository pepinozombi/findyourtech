/**
 * Essentially, you check the length of the given string. If it's longer than a given length n, 
 * clip it to length n (substr or slice) and add html entity &hellip; (…) to the clipped string.
 */
export default function truncate(str, n){
    return (str.length > n) ? str.slice(0, n-1) + '...' : str;
};