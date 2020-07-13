// 从树形数据中递归筛选目标值
function valInDeep(arr = [], val, id, childs) {
  return arr.reduce((flat, item) => {
    return flat.concat(item[id] == val ? item : valInDeep(item[childs] || [], val, id, childs));
  }, []);
}

// 将树形数据向上将此支线递归为一维数组
function flattenDeepParents(arr, parent) {
  return arr.reduce((flat, item) => {
    return flat.concat(item[parent] || [], item[parent] ? flattenDeepParents([item[parent]], parent) : []);
  }, []);
}

// 根据条件递归祖先元素
function regDeepParents(row, parent, cb) {
  if (row[parent]) {
    cb && cb(row[parent]);
    regDeepParents(row[parent], parent, cb);
  }
}

/**
 * 将树形数据向下递归为一维数组
 * @param {*} arr 数据源
 * @param {*} childs  子集key
 */
function flattenDeep(arr = [], childs = "children") {
  return arr.reduce((flat, item) => {
    return flat.concat(
      item,
      item[childs] ? flattenDeep(item[childs], childs) : []
    );
  }, []);
}

/**
 * 深拷贝
 * @param {*} source 要拷贝的数据
 */
function deepClone(source) {
  if (!source && typeof source !== "object") {
    throw new Error("error arguments", "shallowClone");
  }
  const targetObj = source.constructor === Array ? [] : {};
  Object.keys(source).forEach(keys => {
    if (source[keys] && typeof source[keys] === "object") {
      targetObj[keys] = source[keys].constructor === Array ? [] : {};
      targetObj[keys] = deepClone(source[keys]);
    } else {
      targetObj[keys] = source[keys];
    }
  });
  return targetObj;
}

//递归查父
function familyDeepflatten (arr1, id) {
  let temp = [];
  let forFn = function (arr, id) {
    for (var i = 0; i < arr.length; i++) {
      var item = arr[i]
      if (item.id === id) {
        temp.push(item)
        forFn(arr1, item.pid)
        break
      } else {
        if (item.children) {
          forFn(item.children, id)
        }
      }
    }
  }
  forFn(arr1, id)
  return temp;
}

export {
  flattenDeep, // 将树转化为一维数组
  deepClone, // 深拷贝
  valInDeep, // 递归查找
  flattenDeepParents, // 向上将树转化为数组
  regDeepParents ,// 根据条件查找父级树
  familyDeepflatten, //向上查找全部父级
}