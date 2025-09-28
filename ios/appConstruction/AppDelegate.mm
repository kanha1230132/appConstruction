#import <GoogleMaps/GoogleMaps.h> // Add at the top

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions {
  [GMSServices provideAPIKey:@"AIzaSyD8G5BZegL44sB2ZTkczF4wc2VCnVhnnj4"]; // Add this line
  return YES;
}