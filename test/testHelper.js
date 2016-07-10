'use strict';

process.env.NODE_ENV = 'test';

after(function () {
  process.env.NODE_ENV = 'development';
});
