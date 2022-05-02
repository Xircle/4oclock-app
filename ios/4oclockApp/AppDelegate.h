#import <Foundation/Foundation.h>
#import <React/RCTBridgeDelegate.h>
#import <UIKit/UIKit.h>

#import <Expo/Expo.h>

#if RCT_DEV
#import <React/RctDevLoadingView.h>
#endif

@interface AppDelegate : EXAppDelegateWrapper <RCTBridgeDelegate>

@end
