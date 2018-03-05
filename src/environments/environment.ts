// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: 'AIzaSyCnbn2BzqPn8nX-dJ0RHFaeSDGhApJx-Qk',
    authDomain: 'clientpanel-v2.firebaseapp.com',
    databaseURL: 'https://clientpanel-v2.firebaseio.com',
    projectId: 'clientpanel-v2',
    storageBucket: 'clientpanel-v2.appspot.com',
    messagingSenderId: '633019820847'
  }
};
