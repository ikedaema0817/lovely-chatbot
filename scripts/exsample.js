// Description:
//   Messing around with the today API.
// Commands:
//   hubot today  - Return today at random.




//tasksを定義
tasks = new Map();

//連想配列にTodo追加
function todo(task) {
  tasks.set(task,false);
}

//判別する関数
function isDone(taskAndIsDonePair) {
  return taskAndIsDonePair[1];
}

function isNotDone(taskAndIsDonePair) {
  return !isDone(taskAndIsDonePair)
}

//Todoを完了にする
function done(task) {
  if (tasks.has(task)){
    tasks.set(task, true);
  }
}

//完了済みのTodoを表示
function doneList() {
  return Array.from(tasks)
         .filter(isDone)
         .map(function(t){
           return t[1]
         });
}

//未完了のTodoリストを表示
function list() {
  return Array.from(tasks)
      .filter(isNotDone)
      .map(function(t){
        return t[1]
      });
}

//Todoの削除
function del(task) {
  tasks.delete(task);
}

module.exports = function(robot) {
  
  // じゃれあい集
  robot.hear(/疲./i || /つかれた.*/, function(msg) {
    msg.send(msg.random(["お疲れ様です。少し気分転換しましょう", "そろそろ休憩しましょう。コーヒーでもいかがですか？", "諦めないでください。私はあなたのことを信じていますよ"]));
  });

  robot.hear(/嫌い.*/, function(msg) {
    msg.send(msg.random(["私もあなたのことが嫌いです", "なんでそんなことを言うんですか？悲しいです"]));
  });

  robot.hear(/好き.*/ || /付き.*/, function(msg) {
    msg.send(msg.random(["ごめんなさい・・・今まで通りの関係じゃダメですか？", "嬉しい！私もあなたのことが大好きです"]));
  });

  //Todo処理
  robot.hear(/todo (.+)/i, (msg) => {
    var task;
    task = msg.match[1].trim();
    todo(task);
    return msg.send("予定を追加いたしました : " + task);
  });
  //done処理
  robot.hear(/done (.+)/i, (msg) => {
    var task;
    task = msg.match[1].trim();
    done(task);
    return msg.send("お疲れ様です。完了リストに追加しました :" + task);
  });
  //del処理
  robot.hear(/del (.+)/i, (msg) => {
    var task;
    task = msg.match[1].trim();
    del(task);
    return msg.send("スケジュールを削除いたしました :" + task);
  });
  robot.hear(/list/i, (msg) => {
    return msg.send("本日の予定を表示します :\n" + todo.list().join("\n"));
  });
  
  //終わった予定を表示
  return robot.respond(/donelist/i, (msg) => {
    return msg.send("終わった予定はこちらです :\n" + todo.donelist().join('\n'));
  });
};
