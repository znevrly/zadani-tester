import { CzContactStrategy } from './strategies/czContactStrategy';

export class ContactStrategyFactory {
    static strategies = new Map();
  
    static register(domain, StrategyClass) {
      this.strategies.set(domain, StrategyClass);
    }
  
    static create(domain) {
      const StrategyClass = this.strategies.get(domain);
      if (!StrategyClass) {
        throw new Error(`No strategy registered for domain: ${domain}`);
      }
      return new StrategyClass(domain);
    }
  }

ContactStrategyFactory.register('cz', CzContactStrategy);
