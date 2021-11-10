//Lovepreet Singh 7/11/2021

console.log("Chal reha!!")

// to add delay
const pause = (timeoutMsec) => new Promise(resolve => setTimeout(resolve, timeoutMsec))

let size = 45// size of array to be created 
let dist = 30//distance in blocks
let speed = 5//to control speed using delay function
let arr = []
let conid = document.getElementById('array')

// slider input for array size
slider = document.getElementById('myRange')
slider.oninput = function () {
    size = this.value

    // to change distance b/w blocks if size of array is high
    if (size > 50) {
        dist = 13.25
    }
}

// slider input for algo speed
let speedEl = document.getElementById('speed')
speedEl.oninput = function () {
    speed = 10 - this.value
}

// create array
function createArray() {

    // clear the element if already generated
    conid.innerHTML = ""
    arr = []

    for (let i = 0; i < size; i++) {
        let x = Math.floor(Math.random() * 100)
        let ele = document.createElement("div")
        ele.classList.add("block")

        // give height and translate the block class element
        ele.style.height = `${x * 3}px`
        ele.style.transform = `translate(${i * dist}px)`

        // creating label to label the blocks with element size
        let label = document.createElement("label")
        label.classList.add("label")
        label.innerText = x
        ele.appendChild(label)
        conid.appendChild(ele)

        //to change width if size>50 to fit in screen
        if (size > 50) {
            let m = document.querySelectorAll('.block')
            m[i].style.width = "9px"
        }
        arr.push(x)
    }
}

async function bubbleSort() {

    //taking all blocks
    let bl = document.querySelectorAll(".block")

    for (let i = 0; i < arr.length - 1; i++) {

        for (let j = 0; j < arr.length - i - 1; j++) {

            bl[j].style.backgroundColor = 'green'
            bl[j + 1].style.backgroundColor = 'green'
            if (arr[j] > arr[j + 1]) {
                //swapping the styles(height,label) of blocks
                let temp2 = bl[j].style.transform
                bl[j].style.transform = bl[j + 1].style.transform;
                bl[j + 1].style.transform = temp2
                conid.insertBefore(bl[j + 1], bl[j])
                //delay
                await pause(speed * 100)
                bl = document.querySelectorAll(".block")
                let temp = arr[j + 1]
                arr[j + 1] = arr[j]
                arr[j] = temp
            }
            bl[j].style.backgroundColor = 'dodgerblue'
            bl[j + 1].style.backgroundColor = 'dodgerblue'
        }
        bl[bl.length - i - 1].style.backgroundColor = 'palevioletred'
    }
    bl[0].style.backgroundColor = 'palevioletred'
}


//event listener to call createArray fn
let generate = document.getElementById('createArray')
generate.addEventListener('click', () => {

    createArray()
})

//event listener to call bubbleSort fn
let start = document.getElementById('bubble')
start.addEventListener("click", () => {

    // display info about bubble sort
    let el = document.getElementById('info')
    el.innerHTML = "<center><strong>Bubble Sort</strong></center><strong>Worst complexity:</strong> n^2 <br><strong>Average complexity:</strong> n^2<br><strong>Best complexity:</strong> n<br><strong> Space complexity:</strong> 1"
    bubbleSort()

})



//MERGE SORT
async function merge(l, mid, r) {
    console.log(l, r)
    let bl = document.querySelectorAll(".block")
    let left = [], right = []
    let lSize = mid - l + 1
    let rSize = r - mid
    for (let i = 0; i < lSize; i++) {
        left[i] = arr[l + i]
    }
    for (let i = 0; i < rSize; i++) {
        right[i] = arr[mid + i + 1]
    }

    for (let i = l; i <= r; i++) {
        bl[i].style.backgroundColor = `#eb4034`

    }
    await pause(speed * 100)

    let i = 0, j = 0, k = l;
    while (i < left.length && j < right.length) {
        if (left[i] > right[j]) {
            arr[k] = right[j]
            bl[k].style.backgroundColor = 'palevioletred'
            bl[k].style.height = `${right[j] * 3}px`;
            bl[k].children[0].innerText = right[j]
            j++
            k++
        }
        else {
            arr[k] = left[i]
            bl[k].style.backgroundColor = 'palevioletred'
            bl[k].style.height = `${left[i] * 3}px`;
            bl[k].children[0].innerText = left[i]
            i++
            k++
        }
        bl = document.querySelectorAll(".block")
       

    }
    while (i < left.length) {
        arr[k] = left[i]
        bl[k].style.backgroundColor = 'palevioletred'
        bl[k].style.height = `${left[i] * 3}px`;
        bl[k].children[0].innerText = left[i]
        i++
        k++
        bl = document.querySelectorAll(".block")
    }

    while (j < right.length) {
        arr[k] = right[j]
        bl[k].style.backgroundColor = 'palevioletred'
        bl[k].style.height = `${right[j] * 3}px`;
        bl[k].children[0].innerText = right[j]
        j++
        k++
        bl = document.querySelectorAll(".block")
    }
  
}
async function mergeSort(l, r) {
    if (l >= r) {
        return
    }
    let mid = l + Math.floor((r - l) / 2)
    await mergeSort(l, mid)
    await mergeSort(mid + 1, r)
    await merge(l, mid, r)
    await pause(speed * 100)

}

//event listener to call mergeSort fn
let mergeEl = document.getElementById("merge")
mergeEl.addEventListener('click', () => {
    let el = document.getElementById('info')
    el.innerHTML = "<center><strong>Merge Sort</strong></center><strong>Worst complexity:</strong> n*log(n) <br><strong>Average complexity:</strong> n*log(n)<br><strong>Best complexity:</strong> n*log(n)<br><strong> Space complexity:</strong> n"
    mergeSort(0, arr.length - 1)
    console.log(arr)
})


//Selection Sort
async function selectionSort() {
    let bl = document.querySelectorAll('.block')
    for (let i = 0; i < arr.length - 1; i++) {
        let min = i;
        bl[i].style.backgroundColor = 'green'
        for (let j = i + 1; j < arr.length; j++) {
            bl[j].style.backgroundColor = "darkgoldenrod";
            await pause(speed * 100)
            if (parseInt(bl[j].childNodes[0].innerText) < parseInt(bl[min].childNodes[0].innerText)) {
                min = j
                if (min !== i) {
                    bl[min].style.backgroundColor = 'dodgerblue'
                }
            }
            else {
                bl[j].style.backgroundColor = 'dodgerblue'
            }
        }


        let h = bl[min].style.height
        let l = bl[min].childNodes[0].innerText

        bl[min].style.height = bl[i].style.height
        bl[min].childNodes[0].innerText = bl[i].childNodes[0].innerText

        bl[i].style.height = h
        bl[i].childNodes[0].innerText = l

        await pause(speed * 100)
        bl[min].style.backgroundColor = 'dodgerblue'
        bl[i].style.backgroundColor = 'palevioletred'
    }
    bl[arr.length - 1].style.backgroundColor = 'palevioletred'

}

//event listener to call selectionSort fn
let selectionEl = document.getElementById('selection')
selectionEl.addEventListener('click', async () => {

    let el = document.getElementById('info')
    el.innerHTML = "<center><strong>Selection Sort</strong></center><strong>Worst complexity:</strong> n^2 <br><strong>Average complexity:</strong> n^2<br><strong>Best complexity:</strong> n^2<br><strong> Space complexity:</strong> 1"
    selectionSort()
    
})