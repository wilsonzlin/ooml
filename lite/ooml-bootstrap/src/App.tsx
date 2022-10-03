import {OomlClass, ViewTemplate} from 'ooml';
import styles from './App.css';

@OomlClass
export class App {
  name: string = 'World';

  [ViewTemplate] = (
    <div className={styles.App}>
      <h1>Hello {this.name}!</h1>
    </div>
  );
}
