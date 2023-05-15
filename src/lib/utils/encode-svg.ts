// https://gist.github.com/jennyknuth/222825e315d45a738ed9d6e04c7a88d0
export const encodeSVG = (svgString: string): string =>
  svgString
    .replace(
      '<svg',
      ~svgString.indexOf('xmlns')
        ? '<svg'
        : '<svg xmlns="http://www.w3.org/2000/svg"'
    )
    //
    //   Encode (may need a few extra replacements)
    //
    .replace(/"/g, "'")
    .replace(/%/g, '%25')
    .replace(/#/g, '%23')
    .replace(/{/g, '%7B')
    .replace(/}/g, '%7D')
    .replace(/</g, '%3C')
    .replace(/>/g, '%3E')

    .replace(/\s+/g, ' ');
//
//    The maybe list (add on documented fail)
//
//  .replace(/&/g, '%26')
//  .replace('|', '%7C')
//  .replace('[', '%5B')
//  .replace(']', '%5D')
//  .replace('^', '%5E')
//  .replace('`', '%60')
//  .replace(';', '%3B')
//  .replace('?', '%3F')
//  .replace(':', '%3A')
//  .replace('@', '%40')
//  .replace('=', '%3D')
