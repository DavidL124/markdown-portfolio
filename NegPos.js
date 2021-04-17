function Classifier(UserData, Groups) {
    //train the data
    var x = UserData
    var score_list = []
    //mylist.sort(function(a,b){return a[1].localeCompare(b[1]);});
    //Use appropriate binning:
    //Bin by frequency instead by value:
 
    console.log(mylist)
    for(i = 0; i < UserData.length; i++) {
        entry = UserData[i]
        console.log(entry[0])
        for(j = 0; j < entry.length; j++) {
            //User data is in the first position
            user = entry[0]
            question = entry[1]
            answer = entry[2]
            tasks = entry[3]
            score = question + answer + tasks
        }
        score_list.push([score, user])
    } 
    //Now sort based on order:
    console.log(score_list) 
    score_list.sort( (a, b) => {
        return b[0] - a[0]
      });
    console.log("After:", score_list)
    //now divide the length by Groups:
    frequency = Math.floor(UserData.length/Groups)
    //Now find the number of groups possible with the maximum number
    for(start = 1; start <= Groups; start++) {
       if (start * frequency > UserData.length)
          break
    }
    start = start - 1
    console.log("Start with", start)
    console.log("Size of each group", frequency)
    console.log("length", UserData.length)
    console.log("Groups", Groups)
    remainder = UserData.length % Groups
    console.log("remainder", remainder)
    count = 1
    solution = {}
    total = 0
    flag = 0
    neg = UserData.length - 1
    pos = 0
    //flag == 1  means end of list
    gnum = 1
    Group_no = []
    //console.log("ans 1%2", 2%2)
    for (i = 1; i <= frequency * (Groups - 1); i++) {
        total += 1
        if (i%frequency == 0) {
            //console.log("Group", Group_no, i)
            if (flag == 1) {
                //Negative
                person = score_list[neg]
                Group_no.push(person[1])
                solution[["Group " + gnum]] = Group_no
                neg -= 1
                flag = 0
            }
            else if (flag == 0) {
                //positive
                person = score_list[pos]
                Group_no.push(person[1])
                solution[["Group " + gnum]] = Group_no
                pos += 1
                flag = 1
            }
            gnum += 1
            Group_no = []
        }
        else if (i%frequency != 0) {

            if (flag == 1) {
                //Negative
                person = score_list[neg]
                Group_no.push(person[1])
                neg -= 1
                flag = 0
            }
            else if (flag == 0) {
                person = score_list[pos]
                Group_no.push(person[1])
                pos += 1
                flag = 1
            }
        }
    }
    //remainder = UserData.length - total
    remaining = []
    console.log(pos, neg)
    for (j = pos;  pos <= j && j <= neg; j++) {
        person = score_list[j]  
        remaining.push(person[1])
    }
    if (total < UserData.length) {
    solution[["Group " + gnum]] = remaining
    }
    console.log("return value:", solution)
    return solution  
} 
//var mylist = [ ["abc", 1, 2, 4], ["def", 3, 1, 5],  ["ghi", 5, 0, 2]];
//var groups = 2
var mylist = [ ["abc", 1, 2, 4], ["def", 3, 1, 5],  ["ghi", 5, 0, 2], ["yet", 0, 0, 2], ["axi", 3, 1, 2], 
["ret", 5, 6, 2], ['Jeff', 1, 2, 3], ["tim", 1, 0, 0], ['Mark', 1, 5, 6], ["Nate", 2, 3, 4]];
console.log(Classifier(mylist, 9))