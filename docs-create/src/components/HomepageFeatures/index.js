import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

const FeatureList = [
  {
    title: 'Robust',
    Svg: require('@site/static/img/undraw_robust.svg').default,
    description: (
      <>
        Based on dozens of research papers (referenced in the docs) and using adaptive multi-precision
        floating point operations with strict error-bounding techniques ensures
        robust results you can trust.
      </>
    ),
  },
  {
    title: 'Fast',
    Svg: require('@site/static/img/undraw_fast.svg').default,
    description: (
      <>
        Special care has been taken to ensure each function performs well not 
        only in theory but also in practice.
      </>
    ),
  },
  {
    title: 'Tested',
    Svg: require('@site/static/img/undraw_tested.svg').default,
    description: (
      <>
        Hundreds of carefully crafted tests and over 99% coverage means you can
        use every function with confidence and peace of mind.
      </>
    ),
  },
  {
    title: 'Freestanding',
    Svg: require('@site/static/img/undraw_freestanding.svg').default,
    description: (
      <>
        For maximum interoperability, each function is entirely independent (e.g.
        not a method of a class) and takes simple paramters (e.g. a point is just
        an array of numbers and a bezier curve is simply represented as an array of points).
      </>
    ),
  },
  {
    title: 'Accurate',
    Svg: require('@site/static/img/undraw_accurate.svg').default,
    description: (
      <>
        High <a href="https://en.wikipedia.org/wiki/Condition_number)">condition numbers </a>
        are completely mitigated where necessary without a hit to performance. For example,
        bezier curve intersection is <i>guaranteed</i> accurate to 
        within <code>4*Number.EPSILON</code> in the returned paramter values.
      </>
    ),
  },
  {
    title: 'Pure',
    Svg: require('@site/static/img/undraw_pure.svg').default,
    description: (
      <>
        Every function is <a href="https://en.wikipedia.org/wiki/Pure_function">pure </a>.
        The same input to the same function gives the same results - every time. No need
        to clog your short term memory by worrying about state of any kind.
      </>
    ),
  },
];

function Feature({Svg, title, description}) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
