export const tagsToString = (tags : string[]) : string => tags.map(tag => `#${tag}`).join(' ');

export const stringToTags = (tags : string) : string[] => tags.split(' ').map(tag => tag.substring(1));

export const extractTagsFromText = (text: string) : string => Array.from(new Set(text.replaceAll('\n', ' ')
                                                                                     .split(' ')
                                                                                     .filter((word : string) => word.startsWith('#'))
                                                                                     .map((tag : string) => tag.toLocaleLowerCase())))
                                                                                     .join(' ');
