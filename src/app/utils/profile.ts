export type CurrentUser = Pick<
  overwolf.profile.GetCurrentUserResult,
  'username' | 'avatar' | 'displayName'
>;
export function getCurrentUser(): Promise<CurrentUser> {
  return new Promise((resolve, reject) => {
    overwolf.profile.getCurrentUser((result) => {
      if (result.success) {
        resolve({
          username: result.username,
          avatar: result.avatar,
          displayName: result.displayName,
        });
      } else {
        reject(result.error);
      }
    });
  });
}

export function openLoginDialog(): void {
  return overwolf.profile.openLoginDialog();
}
