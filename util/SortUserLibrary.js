function SortUserLibrary(filter, lib){

  const gamesLibrary = lib
  let sortedLib = {}; // theoretically useful for more complicated return types ??
  let sortedLibIndex = []

  const sortOrder = filter.order || null
  const sortRegex = (filter.search || "").toLowerCase()
  try{
    // let sortOperations = 0 // debug variable to help visualize sort complexity
    let sortingLibIndex = []
    sortingLib = gamesLibrary
    .filter((gameObj) => {
      return gameObj !== undefined && gameObj.name.toLowerCase().match(sortRegex) !== null;
    })
    .sort((a, b) => {
      // sortOperations++ // debug variable modification rule, plus one for every sort operation
      switch(sortOrder) {
        case 'alphabetical':
          aName = a.name.toLowerCase();
          bName = b.name.toLowerCase();
          return ((aName === bName) ? 0 : ((aName > bName) ? 1 : -1))
        case 'reverseAlphabetical':
          aName = a.name.toLowerCase();
          bName = b.name.toLowerCase();
          return ((aName === bName) ? 0 : ((aName < bName) ? 1 : -1))
        case 'playtime':
          aTime = parseInt(a.playtime_forever);
          bTime = parseInt(b.playtime_forever);
          return ((aTime === bTime) ? 0 : ((aTime < bTime) ? 1 : -1))
        case 'lastplayed':
          return ((a.rtime_last_played === b.rtime_last_played) ? 0 : ((a.rtime_last_played < b.rtime_last_played) ? 1 : -1))
        case 'firstplayed':
          return ((a.rtime_last_played === b.rtime_last_played) ? 0 : ((a.rtime_last_played > b.rtime_last_played) ? 1 : -1))
        default:
          return (a.appid - b.appid)
      }
    })
    .map((gameObj) => {
      sortingLibIndex.push(gameObj.appid)
      return gameObj
    })
    sortedLib = sortingLib; // actual object array, sorted by parameter
    sortedLibIndex = sortingLibIndex; // array of appid values in sorted order
    // console.log(`sort operations: ${sortOperations}\n`) // display data from debug variable
  }catch(e){
    console.log(`ERROR: ${e}`)
  }
  return sortedLibIndex // returns an array of appid values, holds no connection to state data or parent objects any longer
}

export default SortUserLibrary