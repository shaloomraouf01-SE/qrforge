export function validate(kind:string, f:Record<string,string>):string {
 const value=(key:string)=>(f[key]||'').trim();
 const url=(s:string)=>{try{const u=new URL(s);return ['https:','http:'].includes(u.protocol)&&!!u.hostname}catch{return false}};
 if(Object.values(f).join('').length>1200)return 'Please keep the combined content under 1,200 characters.';
 if(['url','social'].includes(kind)&&!url(value('url')))return 'Enter a complete website address starting with https:// or http://.';
 if(kind==='payment'&&!value('url'))return 'Enter a payment link or payment details.';
 if(kind==='text'&&!value('text'))return 'Enter some text for your QR code.';
 if(kind==='wifi'&&(!value('ssid')||(f.encryption!=='nopass'&&!value('password'))))return 'Enter the network name and password, or select nopass for an open network.';
 if(kind==='email'&&!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value('email')))return 'Enter a valid email address.';
 if(['phone','sms','whatsapp'].includes(kind)&&!/^\+?[\d ()-]{5,25}$/.test(value('phone')))return 'Enter a valid phone number, including the country code.';
 if(kind==='location'&&(!value('lat')||!value('lng')||!Number.isFinite(Number(f.lat))||!Number.isFinite(Number(f.lng))||Math.abs(Number(f.lat))>90||Math.abs(Number(f.lng))>180))return 'Latitude must be between −90 and 90; longitude between −180 and 180.';
 if(kind==='vcard'&&!value('first')&&!value('last'))return 'Enter a contact name.';
 return '';
}
