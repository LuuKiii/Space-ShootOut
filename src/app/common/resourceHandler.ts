export class ResourceHandler {
  private static readonly ASSETS_PATH = '/Space-ShootOut/src/assets/';

  public static getResourcePath(filename: string): string {
    return this.ASSETS_PATH + filename;
  }
}
