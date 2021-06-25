const semver = require('semver')

// semver.valid('1.2.3') // '1.2.3'
// semver.valid('a.b.c') // null
// semver.clean('  =v1.2.3   ') // '1.2.3'
// console.log(semver.satisfies('1.2.3', '1.x || >=2.5.0 || 5.0.0 - 7.2.3')) // true
// console.log(semver.satisfies('0.2.3', '1.x || >=2.5.0 || 5.0.0 - 7.2.3')) // false
// semver.gt('1.2.3', '9.8.7') // false
// semver.lt('1.2.3', '9.8.7') // true
// semver.minVersion('>=1.0.0') // '1.0.0'
// const parsed_result = semver.parse('1.5.36-rc.1', {includePrerelease: true});
// //console.log(parsed_result);
// console.log(parsed_result.prerelease);
// const rc_number = parsed_result.prerelease[1];
// console.log(rc_number);

// const valided_result = semver.valid(parsed_result);
// console.log(valided_result);


const array_of_release_version_in_branch_folder = ["1.0.2-rc.2","1.0.2-rc.1", "1.0.2-rc.10"];
let biggest_version_so_far = "0.0.0";

for (const version of array_of_release_version_in_branch_folder){
  if (semver.gt(version, biggest_version_so_far)){
    biggest_version_so_far = version;
  }
}

console.log(biggest_version_so_far);

// semver.valid(semver.coerce('v2')) // '2.0.0'
// semver.valid(semver.coerce('42.6.7.9.3-alpha')) // '42.6.7'