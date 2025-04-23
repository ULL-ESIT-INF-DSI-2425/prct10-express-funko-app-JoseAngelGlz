import request from "request";

export const findSpell = (name: string = '', type: string = '', spell: string = '') => {
  const url = `https://wizard-world-api.herokuapp.com/Spells?Name=${encodeURIComponent(name)}&Type=${encodeURIComponent(type)}&Incantation=${encodeURIComponent(spell)}`;
  return new Promise<request.Response>((resolve, reject) => { 
    request(
      { url: url, json: true },
      (error: Error, response: request.Response) => {
        if (error) {
          reject(error.message);
        } else if (response.body.length === 0) {
          reject("Spells API error: no spell found");
        } else {
          resolve(response);
        }
      },
    );
  });
};

findSpell(undefined, undefined, "Anteoculatia");