export class MapCategoryHelper {

  getCategoriesToRemove(chosenCategories: any, markerStore: any) : string[] {
    if (chosenCategories == undefined)
      return null;

    let categories = [];
    Object.keys(markerStore).forEach(category => {
      if (chosenCategories.includes(category)) {
        categories.push(category);
      }
    })

    return categories;
  }
}