import { base64_decode } from "./base64";
import { dataType } from "./constants";
import { clear_string, split_text } from "./functions";
import { Encoding } from "./types";
import { check_encoding } from "./verifiy";

function string_to_binary(str: string): Uint8Array {
  return string_array_to_binary(split_text(str));
}

function string_array_to_binary(str: string[]): Uint8Array {
  return Uint8Array.from(
    str.map((c) => {
      switch (c) {
        case "\\n":
          return 10;
        case "\\r":
          return 13;
        case "\\0":
          return 0;
        case "\\\\":
          return 92;
        default:
          break;
      }
      const cc = c.match(/(?<=\\x)[0-9a-fA-F]{1,2}/g);
      if (cc !== null && cc.length > 0) {
        return parseInt(cc[0], 16);
      }
      return c.charCodeAt(0);
    })
  );
}

export function parse(str: string, encode: Encoding): Uint8Array {
  check_encoding(encode);
  str = clear_string(str, encode);

  if (encode === "text") return string_to_binary(str);
  if (encode === "base64") return base64_decode(str);
  return Uint8Array.from(
    dataType[encode]
      .split(str)
      .map((s: string) => parseInt(s, dataType[encode].base))
  );
}

export function to_data(str: string[], encode: Encoding): Uint8Array {
  check_encoding(encode);
  if (encode === "text") return string_array_to_binary(str);
  if (encode === "base64") return base64_decode(str[0]);

  return Uint8Array.from(
    str.map((s: string) => parseInt(s, dataType[encode].base))
  );
}
