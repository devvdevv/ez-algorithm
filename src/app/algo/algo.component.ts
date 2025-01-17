import {
  Component,
  OnInit
} from "@angular/core";
import { SortModel } from "../model/sort.model";

enum ColorSort {
  pink,
  green,
  yellow
}

@Component({
  selector: "app-algo",
  templateUrl: "./algo.component.html",
  styleUrls: ["./algo.component.scss"],
})
export class AlgoComponent implements OnInit {
  static MIN_ELE = 10;
  static MAX_ELE = 350;

  static pink = "#ff4081";
  static green = "#69f0ae";
  static yellow = "#ffd740";

  array: number[] = [0];
  sortColor: String;

  numCompare1: number = 0;
  numCompare2: number = 0;

  delayAmount: number;

  delaymin: number = 1;
  delaymax: number = 800;
  delayVal: number = this.delaymin;

  quantitymin: number = 3;
  quantitymax: number = 70;
  quantityVal: number = this.quantitymin;

  selectedSortId: number;

  sortList: SortModel[] = [
    { id: 1, name: "Selection" },
    { id: 2, name: "Bubble" },
    // { id: 3, name: "Heap" },
  ];

  isRunning: boolean = false;
  isSearchMode: boolean = true;

  constructor() {}

  ngOnInit(): void {
    this.setHeightCssForArray();
    this.createArray();
  }

  setDelayValue(event) {
    this.delayVal = event.value;
  }

  setQuantityValue(event) {
    this.quantityVal = event.value;
    this.createArray();
  }

  setHeightCssForArray() {
    document.getElementById("array").style.height =
      AlgoComponent.MAX_ELE + "px";
  }

  getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  generateUniqueRandomArray(min, max, quantity) {
    if (this.array.length > quantity) {
      this.array = [0]; // reset.
    }

    for (let i = 0; i < quantity; i++) {
      let randomNumber = this.getRandomNumber(min, max);
      while (this.array.indexOf(randomNumber) !== -1) {
        randomNumber = this.getRandomNumber(min, max);
      }

      this.array[i] = randomNumber;
    }

    return this.array;
  }

  createArray() {
    this.generateUniqueRandomArray(
      AlgoComponent.MIN_ELE,
      AlgoComponent.MAX_ELE,
      this.quantityVal
    );
  }

  color(colorSort: ColorSort) {
    switch (colorSort) {
      case ColorSort.pink:
        return AlgoComponent.pink; // normal
      case ColorSort.green:
        return AlgoComponent.green; // compare
      case ColorSort.yellow:
        return AlgoComponent.yellow; // swap
      default:
        return null;
    }
  }

  sleep = (milliseconds) => {
    return new Promise((resolve) => setTimeout(resolve, milliseconds));
  };

  selectionSort = async () => {
    this.isRunning = true;
    for (let i = 0; i < this.array.length; i++) {
      this.numCompare1 = this.array[i];
      this.sortColor = this.color(ColorSort.pink);
      for (let j = i + 1; j < this.array.length; j++) {
        this.numCompare2 = this.array[j];
        this.sortColor = this.color(ColorSort.green);
        await this.sleep(this.delayVal);
        if (this.array[i] > this.array[j]) {
          let temp = this.array[i];
          this.array[i] = this.array[j];
          this.array[j] = temp;

          this.numCompare1 = this.array[i];
          this.numCompare2 = this.array[j];

          this.sortColor = this.color(ColorSort.yellow);

          await this.sleep(this.delayVal);
        }
      }
    }
    this.sortColor = this.color(0);
    this.isRunning = false;
  };

  bubbleSort = async () => {
    this.isRunning = true;
    let size = this.array.length;
    for (let i = 0; i < this.array.length; i++) {
      for (let j = 0; j < size - 1; j++) {
        this.numCompare1 = this.array[j];
        this.numCompare2 = this.array[j + 1];
        this.sortColor = this.color(1);
        await this.sleep(this.delayVal);
        if (this.array[j] > this.array[j + 1]) {
          let temp = this.array[j];
          this.array[j] = this.array[j + 1];
          this.array[j + 1] = temp;

          this.sortColor = this.color(2);
          await this.sleep(this.delayVal);
        }
      }
      size--;
    }
    this.sortColor = this.color(0);
    this.isRunning = false;
  };

  heapSort = async () => {

  }

  choosingSort() {
    switch (Number(this.selectedSortId)) {
      case 1: {
        this.selectionSort();
        break;
      }
      case 2: {
        this.bubbleSort();
        break;
      }
      case 3: {
        this.heapSort();
        break;
      }
    }
  }
}
