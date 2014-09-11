This is a project template for AngularJS, browserify and Once CSS library.

Follow these small steps to get it running:

Pre-conditions: NodeJS, npm and bower are installed.

1. Open console.
2. Navigate to a directory where you want to install k-bag. It's usually a project directory.
3. Run command:

    `git clone https://github.com/rapitkan/k-bag.git`

    => k-bag folder will be created under your project's directory.

4. Navigate to the k-bag directory and run

   `git submodule update --init`
  
    => This will fetch the Once css library source codes from GitHub.

5. In the k-bag directory, run

  `npm install`

6. In the k-bag directory, run

  `bower install`

7. Navigate back to your project's folder.

8. Create a file named as projectStructure.json. This is an example of it:

`{
  "devFolder": "../app",
  "distFolder": "../dist",
  "port": 35000,
  "copy": [{
    "src": "/images/*.*",
    "base": "/images/"
  }, {
    "src": "/images/pictures/*.*",
    "base": "/images/pictures/"
  }, {
    "src": "/songs/*.*",
    "base": "/songs/"
  }]
}`

The devFolder is the folder where the source files of your application are going to locate. It's relative to k-bag folder. The distFolder is the folder where your built application will locate. Like the devFolder the distFolder's path is also relative to k-bag folder. In a copy section you can specify any files which will be copied under from devFolder to distFolder.

9. In the k-bag directory, run

  `npm start`

10. Have fun!!
