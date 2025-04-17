import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export const emailReg = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
export const numbrReg = /^0\d{9}$/

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatBigNum(num: number) {
  const str = num.toString();
  const len = str.length;
  
  if(len <= 3)
    return str;
  
  let res = [];
  let c = 0;

  for(let i = len - 1; i >= 0; --i) {
    res.push(str[i]);
    ++c;
    
    if(c === 3 && i !== 0) {
      res.push('.');
      c = 0;
    }
  }

  return res.reverse().join('');
}

export function formatDate(str: string) {
  const date = new Date(str);
  const yyyy = date.getFullYear();
  let mm = date.getMonth() + 1;
  let dd = date.getDate();
  let sDD = String(dd);
  let sMM = String(mm);

  if(dd < 10)
    sDD = '0' + dd;
  
  if(mm < 10)
    sMM = '0' + mm;

  return sDD + '/' + sMM + '/' + yyyy;
}


export function checkEmail(email: string) {
  return emailReg.test(email);
}

export function checkPhoneNumber(number: string) {
  return numbrReg.test(number);
}
