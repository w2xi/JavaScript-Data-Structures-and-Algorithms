let i = 0;

// 最大调用栈（结果取决于 操作系统和宿主环境,这里的宿主环境时node）
function maximumCallStackSize() {
  i++;
  maximumCallStackSize();
}

try {
  maximumCallStackSize();
} catch (e) {
  console.log('Maximum call stack size:', i); // 15698
}