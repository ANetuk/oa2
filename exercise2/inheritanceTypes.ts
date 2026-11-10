class HasArea {
  private area: number;

  constructor(area: number) {
    this.area = area;
  }

  getArea(): number {
    return this.area;
  }
}

// Расширение класса родителя
// К классу HasArea добавляются координаты и получается класс, обозначающий фигуру на плоскости.
class Shape2D extends HasArea {
  private x: number;
  private y: number;

  constructor(x: number, y: number, area: number) {
    super(area);
    this.x = x;
    this.y = y;
  }

  public getX(): number {
    return this.x;
  }

  public getY(): number {
    return this.y;
  }
}

// Специализация класса родителя:
// К классу Shape2D добавляется длина стороны и получается класс, обозначающий квадрат.
// Класс Square так же задаёт то, как будет вычисляться площадь.
class Square extends Shape2D {
  private side: number;

  constructor(x: number, y: number, side: number) {
    super(x, y, side * side);
    this.side = side;
  }

  public getSide(): number {
    return this.side;
  }
}
