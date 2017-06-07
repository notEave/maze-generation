import { AttractionGrid } from '../maze-generation/AttractionGrid';
import { GridWrapper    } from '../maze-generation/GridWrapper';
import { MultiSimplex   } from '../noise/MultiSimplex';
import { GridPopulation } from '../maze-generation/GridPopulation';
import { Random } from '../util/Random';

export class SimplexLogic {
  private          complete   :boolean       ;
  private readonly gridWrapper:GridWrapper   ;
  private readonly simplex    :MultiSimplex  ;
  private readonly population :GridPopulation;

  public constructor(resolution :number,
                     compression:number,
                     noiseAmt   :number) {
    this.complete = false;

    this.gridWrapper = new GridWrapper(
      new AttractionGrid(resolution, resolution)
    );
    this.population = new GridPopulation(this.gridWrapper);

    this.population.startFrom(
      Random.nextInt(resolution),
      Random.nextInt(resolution)
    );
  }
}
