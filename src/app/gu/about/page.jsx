import './about.module.css'


export default function About() {
  return (
    <div>
    <div className="group-container">
    <h1 className="title">Group Vision and Purpose</h1>
    <p className="description">
      Our community-driven group, formed by passionate working professionals, is rooted in the principles of
      collective contribution and cultural preservation. Each member donates a portion of their earnings monthly,
      creating a shared fund that serves multiple purposes:
    </p>
    
    <ul className="purposes">
      <li>
        <strong>Future Temple Construction:</strong> We are committed to contributing to the spiritual and cultural
        development of our village by building a temple—a place of worship that will serve as a timeless legacy for
        future generations.
      </li>
      <li>
        <strong>Festival Celebrations:</strong> Our group ensures that traditional festivals are celebrated with
        grandeur and joy, fostering unity and keeping our vibrant heritage alive.
      </li>
      <li>
        <strong>Event Contributions:</strong> The fund supports various community events, strengthening bonds and
        promoting a sense of belonging among all villagers.
      </li>
    </ul>

    <p className="growth-strategy">
      In addition to using these funds for community development and celebrations, we adopt a sustainable approach by
      reinvesting part of the money every month to grow the fund. By carefully managing contributions and exploring
      opportunities for financial growth, we aim to amplify our impact and ensure the long-term prosperity of our
      initiatives.
    </p>

    <p className="closing-note">
      Through this initiative, we not only preserve our traditions and enrich our cultural identity but also build a
      self-sustaining model that leaves a lasting impact for generations to come.
    </p>
  </div>

  <div className="community-container">
      <h1 className="title">Community Growth Initiative</h1>

      <p className="intro">
        <strong>Empowering Each Other Through Collective Efforts</strong>
      </p>

      <p className="description">
        Our group operates on a sustainable and growth-oriented model where contributions are not only pooled for cultural and community events but are also utilized to generate additional value. Here’s how it works:
      </p>

      <div className="steps">
        <div className="step">
          <h3>1. Pooling Resources:</h3>
          <p>
            Each member contributes a fixed amount monthly, creating a shared fund for the benefit of the community.
          </p>
        </div>
        <div className="step">
          <h3>2. Support and Growth:</h3>
          <ul>
            <li>Members can access the fund for personal or professional needs, such as a short-term financial requirement.</li>
            <li>
              Funds are issued with a minimal interest rate (e.g., 1%), ensuring fair utilization while enabling growth of the collective fund.
            </li>
          </ul>
        </div>
        <div className="step">
          <h3>3. Reinvestment for Community Prosperity:</h3>
          <p>
            Borrowers return the principal amount along with a small increment (e.g., ₹10,000 borrowed → ₹10,100 returned).
            The incremental growth is reinvested back into the fund, increasing its value month by month.
          </p>
        </div>
        <div className="step">
          <h3>4. Sustainable and Scalable:</h3>
          <p>
            This approach ensures that while individual members benefit from financial support, the collective fund grows steadily, making it possible to take on larger community projects in the future.
          </p>
        </div>
      </div>

      <div className="example-section">
        <h3>Example in Practice:</h3>
        <ul>
          <li>
            <strong>Month 1:</strong> Member A borrows ₹10,000 and returns ₹10,100 the next month.
          </li>
          <li>
            <strong>Month 2:</strong> The fund now has an additional ₹100, which can be reinvested or used to support another member.
          </li>
          <li>
            <strong>Ongoing Cycle:</strong> This process continuously strengthens the fund, benefiting both individuals and the community as a whole.
          </li>
        </ul>
      </div>

      <p className="mission">
        <strong>Our Mission:</strong> Through this initiative, we aim to create a cycle of financial growth and mutual support, empowering our members while building a sustainable fund for future projects, such as temple construction and cultural festivities.
      </p>
    </div>

</div>
  

);
};
