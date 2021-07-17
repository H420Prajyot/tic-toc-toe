2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
17
18
19
20
21
22
23
24
25
26
27
28
29
30
31
32
33
34
35
36
37
38
39
40
41
42
43
44
45
46
47
48
49
50
51
52
53
54
55
56
57
58
59
60
61
62
63
64
65
66
67
68
69
70
71
72
73
74
75
76
77
78
79
80
81
82
83
84
85
86
87
88
89
90
91
92
93
94
95
96
97
98
99
100
101
102
103
104
105
106
107
108
109
110
111
112
113
114
115
116
117
118
119
120
121
122
123
124
125
126
127
128
129
130
131
132
133
134
135
136
137
138
139
140
141
142
143
144
145
146
147
148
149
150
151
152
153
154
155
156
157
158
159
160
161
162
163
164
165
166
167
168
169
170
171
172
173
174
175
176
177
178
179
180
181
182
183
184
185
186
187
188
189
190
191
192
193
194
195
196
197
198
199
200
201
202
203
204
205
206
207
208
209
210
211
212
213
214
215
216
217
218
219
220
221
222
223
224
225
226
227
228
229
230
231
232
233
234
235
236
237
238
239
240
241
242
243
244
245
246
247
248
249
250
251
252
253
254
255
256
257
258
259
260
261
262
263
264
265
266
267
268
269
270
271
272
273
274
275
276
277
278
279
280
281
282
283
284
285
286
287
288
289
290
291
292
293
294
295
296
297
298
299
300
301
302
303
304
305
306
307
308
309
310
311
312
313
314
315
316
317
318
319
320
321
322
323
324
325
326
327
328
329
330
331
332
333
334
335
336
337
	
var isX = true;
var isValid = false;
var cells = [];
var player = 1;
var computer = 0;
var onMove = 1;
var result = "";
var intervalId;
 
$(document).ready(function(){
 
 
  $( "#dialog-confirm" ).dialog({
      resizable: false,
      height:140,
      modal: true,
      buttons: {
        "X": function() {
          isX = true;
          $( this ).dialog( "close" );
          startGame();
        },
        "O": function() {
          isX = false;
          $( this ).dialog( "close" );
          startGame();
        }
      }
    });
});
 
function startGame(){
  emptyCells();
  if(isX){
    player = 1;
    computer = 0;
  }else{
    player = 0;
    computer = 1;
  }
 
  var rnd = Math.round(Math.random());
    if(rnd === 1){
      onMove = player;
    }else{
      onMove = computer;
    }
 
 
  intervalId = setInterval(loop, 100);
 
 
}
 
function loop(){
 
 
 
 
 if(onMove === player){
      isValid = true;
    }else{
      computerMove();
      onMove = player;
    }
 
 
 $(".cell").on("click", function(){
  if(isValid){
 
    var sign = player === 0 ? "O" : "X";
 
    var i = $(this).attr("id")[1]-1;
    var j = $(this).attr("id")[2]-1;
    if(cells[i][j] === -1){
      cells[i][j] = player;
      $(this).html(sign);
      isValid = false;
   if(!whoWon(cells)){
 onMove = computer;
   }
    }
  }
});
 
 
 
    var winner = whoWon(cells);
    if(winner){
   if(winner === "computer"){
   alert("You Lost, Better Luck Next Time");
   }else{
 alert("Congratulation!! You Won");
      }
   result = winner;
    }
    else if(isTableFull(cells)){
     result = "Draw";
      alert("Match Is "+ result);
    }
    if(result !== ""){
   clearInterval(intervalId);
   result = "";
   cells = [];
   clearTable();
   startGame();
    }
}
 
 
function isTableFull(cells){
  for(var i in cells){
    for(var j in cells[i]){
      if(cells[i][j] === -1){
        return false;
      }
    }
    }
  return true;
}
 
function whoWon(cells){
  for(var i in cells){
    if(cells[i][0] !== -1 &&
       cells[i][1] !== -1 &&
       cells[i][2] !== -1 &&
       cells[i][0] === cells[i][1] && cells[i][0] === cells[i][2]){
      if(cells[i][0] === player){
        return "player";
      }
      else{
        return "computer";
      }
    }
    }
  for(var i in cells){
    if(cells[0][i] !== -1 &&
       cells[1][i] !== -1 &&
       cells[2][i] !== -1 &&
       cells[0][i] === cells[1][i] && cells[0][i] === cells[2][i]){
      if(cells[0][i] === player){
        return "player";
      }
      else{
        return "computer";
      }
    }
    }
 
  if((cells[0][0] !== -1 &&
      cells[1][1] !== -1 &&
      cells[2][2] !== -1 &&
      cells[0][0] === cells[1][1] &&
    cells[0][0] === cells[2][2]) ||
    (cells[0][2] !== -1 &&
     cells[1][1] !== -1 &&
     cells[2][0] !== -1 &&
    cells[0][2] === cells[1][1] &&
    cells[0][2] === cells[2][0])){
    if(cells[1][1] === player){
        return "player";
      }
      else{
        return "computer";
      }
  }
 
  return false;
}
 
 
 
function computerMove(){
  var arr = freeCells();
  var arr2 = bestMove();
  var sign = computer === 0 ? "O" : "X";
  var x = Math.round(Math.random()*arr.length);
 
  if(arr2.length >= 1){
   var i = arr2[0];
   var j = arr2[1];
  }else if(arr.length >= 1){
   var i = arr[x][0];
   var j = arr[x][1];
  }
  if((arr.length >= 1 || arr2.length >= 1) && cells[i][j] === -1){
    var a = parseInt(i) + 1;
    var b = parseInt(j) + 1;
    new Promise(function(resolve, reject){
      $("#c"+a+b).html(sign);
      resolve();
    }).then(function(){
       cells[i++][j++] = computer; })
   return 0;
 }
 
}
 
function freeCells(){
 var arr = [];
 for(var i in cells){
 for(var j in cells[i]){
 if(cells[i][j] === -1){
 arr.push([i,j]);
 }
 }
 }
 return arr;
}
 
function bestMove(){
 var computerInLine = 0;
 var playerInLine = 0;
 var a = 0;
 var maybe = null;
 //check rows
 for(var i in cells){
 for(var j in cells[i]){
 if(cells[i][j] !== -1){
 if(cells[i][j] === computer){
 computerInLine++;
 }else{
 playerInLine++;
 }
 }else{
 a = j;
 }
 }
 if(computerInLine === 2 && a !== 0){
 return [i, a];
 }else if(playerInLine === 2 && a !== 0){
 maybe = [i, a];
 }
 a = 0;
 computerInLine = 0;
 playerInLine = 0;
 }
 
 //check columns
 
 for(var j in cells){
 for(var i in cells[i]){
 if(cells[i][j] !== -1){
 if(cells[i][j] === computer){
 computerInLine++;
 }else{
 playerInLine++;
 }
 }else{
 a = i;
 }
 }
 if(computerInLine === 2 && a !== 0){
 return [a, j];
 }else if(playerInLine === 2 && a !== 0){
 maybe = [a, j];
 }
 a = 0;
 computerInLine = 0;
 playerInLine = 0;
 }
 
 //check diagonals
 var h = 0;
 a = -1;
 var b = -1;
 playerInLine = 0;
 computerInLine = 0;
 for(var k = 0; k < 3; k++){
 if(cells[k][h] !== -1){
 if(cells[k][h] === computer){
 computerInLine++;
 }else{
 playerInLine++;
 }
 }else{
 a = k;
 b = h;
 }
 
 if(computerInLine === 2 && a !== -1 && b !== -1){
 return [a, b];
 }else if(playerInLine === 2 && a !== -1 && b != -1){
 maybe = [a, b];
 }
 
 h++;
 }
 
 h = 0;
 a = -1;
 b = -1;
 playerInLine = 0;
 computerInLine = 0;
 
 for(var k = 2; k >= 0; k--){
 if(cells[k][h] !== -1){
 if(cells[k][h] === computer){
 computerInLine++;
 }else{
 playerInLine++;
 }
 }else{
 a = k;
 b = h;
 }
 
 if(computerInLine === 2 && a !== -1 && b !== -1){
 return [a, b];
 }else if(playerInLine === 2 && a !== -1 && b != -1){
 maybe = [a, b];
 }
 
 h++;
 }
 
 
 
 if(maybe !== null) return maybe;
 
 return [];
}
 
function clearTable(){
 for(var a = 1; a<= 3; a++){
 for(var b = 1; b<=3; b++){
 $("#c"+a+b).html("");
 }
 }
}
 
 
function emptyCells(){
  for(var a = 0; a < 3; a++){
    cells.push([-1,-1,-1]);
  }
}