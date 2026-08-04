const projectTags = {
  simulation: ["C#", "Unity", "JSON", "Editor Tooling"],
  pipeline: ["C#", "Unity Editor", "Automation"],
  blender: ["Python", "Blender API", "Unity"],
  aseprite: ["Lua", "Aseprite API", "Heightmaps"],
};

function TagList({ items }: { items: string[] }) {
  return (
    <ul className="tag-list" aria-label="Technologies used">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}

export default function Home() {
  return (
    <main>
      <header className="site-header">
        <a className="wordmark" href="#top" aria-label="Derek Vieau, home">
          <span className="wordmark-mark">DV</span>
          <span>Software systems &amp; tooling</span>
        </a>
        <nav aria-label="Primary navigation">
          <a href="#work">Work</a>
          <a href="#architecture">Architecture</a>
          <a href="#about">About</a>
        </nav>
      </header>

      <section className="hero" id="top">
        <div className="hero-copy">
          <p className="eyebrow">C# · Unity · Tooling · Automation</p>
          <h1>I build tools that make complex systems easier to use.</h1>
          <p className="hero-intro">
            I’m Derek Vieau, a software developer focused on object-oriented
            architecture, editor extensions, and production workflows. I turn
            data-heavy problems into maintainable systems with practical visual
            tools.
          </p>
          <div className="hero-actions">
            <a className="button button-primary" href="#work">
              Explore selected work
            </a>
            <a
              className="button button-secondary"
              href="/Derek-Vieau-Resume.pdf"
              target="_blank"
              rel="noreferrer"
            >
              View résumé PDF
            </a>
          </div>
        </div>

        <aside className="hero-system" aria-label="Development approach">
          <p className="diagram-label">A system designed in layers</p>
          <div className="hero-node hero-node-main">
            <span>Reusable core</span>
            <strong>Domain model</strong>
          </div>
          <div className="hero-branches" aria-hidden="true">
            <span />
            <span />
            <span />
          </div>
          <div className="hero-node-row">
            <div className="hero-node">
              <span>Authoring</span>
              <strong>Editor tools</strong>
            </div>
            <div className="hero-node">
              <span>Runtime</span>
              <strong>Game systems</strong>
            </div>
            <div className="hero-node">
              <span>Output</span>
              <strong>Asset pipeline</strong>
            </div>
          </div>
        </aside>

        <div className="hero-proof" aria-label="Experience highlights">
          <div>
            <strong>6 years</strong>
            <span>C# and Unity development</span>
          </div>
          <div>
            <strong>Data-driven</strong>
            <span>Definitions, registries, and save-ready state</span>
          </div>
          <div>
            <strong>Tool-first</strong>
            <span>Visual workflows for repeatable production</span>
          </div>
        </div>
      </section>

      <section className="section" id="work">
        <div className="section-heading">
          <p className="eyebrow">Selected work</p>
          <h2>Engineering systems, not one-off scripts.</h2>
          <p>
            Each project separates reusable logic from its editor or production
            surface, allowing the workflow to grow without rebuilding the core.
          </p>
        </div>

        <article className="project project-featured">
          <div className="project-copy">
            <p className="project-number">01 · Simulation framework</p>
            <h3>Systems-Driven Simulation Framework</h3>
            <p className="project-lead">
              A modular Unity foundation for a long-term simulation project,
              combining world data, gameplay systems, and accessible editor
              tooling without tightly coupling them together.
            </p>
            <TagList items={projectTags.simulation} />
          </div>

          <div className="spline-story">
            <figure className="media-card media-card-tall">
              <img
                src="/Spline-Graph.png"
                alt="Unity editor spline graph with numbered control nodes connected by road segments"
              />
              <figcaption>
                <span>01</span>
                Author a connected spline graph through a visual editor.
              </figcaption>
            </figure>
            <div className="spline-results">
              <figure className="media-card">
                <img
                  src="/Spline-Result.png"
                  alt="Top-down generated road network following the authored spline"
                />
                <figcaption>
                  <span>02</span>
                  Generate consistent road geometry from the graph.
                </figcaption>
              </figure>
              <figure className="media-card">
                <img
                  src="/Spline-Height-Show.png"
                  alt="Three-dimensional terrain view showing the generated road adapting to elevation"
                />
                <figcaption>
                  <span>03</span>
                  Carry the result into an elevation-aware world.
                </figcaption>
              </figure>
            </div>
          </div>
        </article>

        <article className="architecture" id="architecture">
          <div className="architecture-copy">
            <p className="project-number">Architecture detail</p>
            <h3>A composable inventory model</h3>
            <p>
              The inventory is divided by responsibility: shared definitions
              describe item types, a small interface defines container behavior,
              and each stack owns its quality- and flag-aware runtime state.
              Consumers observe changes through events instead of reaching into
              the storage implementation.
            </p>
            <ul className="architecture-notes">
              <li>
                <strong>Encapsulation:</strong> stack mutation and capacity rules
                stay inside <code>InventoryItemStack</code>.
              </li>
              <li>
                <strong>Abstraction:</strong> backpacks, containers, or vendor
                inventories can target <code>IInventory</code>.
              </li>
              <li>
                <strong>Composition:</strong> item definitions, quality buckets,
                flag counts, and optional placeable data remain focused objects.
              </li>
            </ul>
          </div>

          <div className="architecture-map" aria-label="Inventory architecture diagram">
            <div className="arch-lane">
              <p>Shared data</p>
              <div className="arch-card arch-card-blue">
                <strong>ItemDefinition</strong>
                <span>Identity · categories · stack rules · economy</span>
              </div>
              <div className="arch-card">
                <strong>ItemDatabase</strong>
                <span>Resolves stable IDs for runtime and save data</span>
              </div>
            </div>

            <div className="arch-arrow" aria-hidden="true">→</div>

            <div className="arch-lane">
              <p>Container contract</p>
              <div className="arch-card arch-card-accent">
                <strong>IInventory</strong>
                <span>Slots · Add · Remove · counts · change events</span>
              </div>
              <div className="arch-card">
                <strong>SimpleInventory</strong>
                <span>Capacity, unlocked rows, and stack placement</span>
              </div>
            </div>

            <div className="arch-arrow" aria-hidden="true">→</div>

            <div className="arch-lane">
              <p>Runtime state</p>
              <div className="arch-card arch-card-blue">
                <strong>InventoryItemStack</strong>
                <span>One definition with event-driven mutations</span>
              </div>
              <div className="arch-card">
                <strong>QualityFlagBucket</strong>
                <span>Quality totals + bought, cooked, quest, or stolen counts</span>
              </div>
            </div>

            <div className="arch-observers">
              <span>Observed by</span>
              <strong>Hotbar</strong>
              <strong>UI</strong>
              <strong>Quests</strong>
              <strong>Save adapters</strong>
            </div>
          </div>
        </article>

        <div className="project-grid">
          <article className="project-card pipeline-card">
            <div>
              <p className="project-number">02 · Editor automation</p>
              <h3>Unity Asset Pipeline Automation</h3>
              <p>
                Editor tools automate bulk import, configuration, and project
                setup, applying the same rules across large groups of visual
                assets instead of relying on repeated manual corrections.
              </p>
              <TagList items={projectTags.pipeline} />
            </div>
            <div className="pipeline" aria-label="Automated asset pipeline">
              <div>
                <span>1</span>
                <strong>Bulk import</strong>
                <small>Collect source assets</small>
              </div>
              <b aria-hidden="true">→</b>
              <div>
                <span>2</span>
                <strong>Apply rules</strong>
                <small>Configure consistently</small>
              </div>
              <b aria-hidden="true">→</b>
              <div>
                <span>3</span>
                <strong>Ready assets</strong>
                <small>Reduce correction work</small>
              </div>
            </div>
          </article>

          <article className="project-card blender-card">
            <div className="project-card-copy">
              <p className="project-number">03 · Blender production tooling</p>
              <h3>From pixel-art source to production-ready 3D asset.</h3>
              <p>
                Custom Blender extensions turn pixel-art PNGs into standardized
                paper-like or voxel-style models, support folding workflows, and
                expose configurable Unity export options for merging, modifiers,
                baking, and preparation.
              </p>
              <TagList items={projectTags.blender} />
            </div>
            <figure className="video-shell">
              <video
                src="/blender-show-bounce.mp4"
                poster="/blender-show-poster.jpg"
                autoPlay
                muted
                loop
                playsInline
                controls
                preload="metadata"
                aria-label="Blender extension demonstration playing forward and backward"
              />
              <figcaption>
                <span>Source spritesheet</span>
                <img
                  src="/animated_chimney-export.png"
                  alt="48 by 48 pixel-art spritesheet used to create the animated chimney model"
                />
                <p>
                  The chimney in the demonstration begins as this compact
                  48×48 spritesheet.
                </p>
              </figcaption>
            </figure>
          </article>

          <article className="project-card aseprite-card">
            <div className="project-card-copy">
              <p className="project-number">04 · Aseprite workflow extension</p>
              <h3>Heightmaps generated directly from pixel art.</h3>
              <p>
                A Lua extension automates heightmap creation for recurring asset
                work, keeping related source and derived images consistent while
                removing repetitive image-processing steps.
              </p>
              <TagList items={projectTags.aseprite} />
            </div>
            <div className="pixel-comparison" aria-label="Original sprite and generated heightmap">
              <figure>
                <div className="pixel-stage">
                  <img
                    src="/Bush-Pre-Heightmap.png"
                    alt="Original pixel-art bush sprite"
                  />
                </div>
                <figcaption>Original sprite</figcaption>
              </figure>
              <div className="comparison-arrow" aria-hidden="true">→</div>
              <figure>
                <div className="pixel-stage pixel-stage-result">
                  <img
                    src="/Bush-Heightmap.png"
                    alt="Purple-blue heightmap generated from the bush sprite"
                  />
                </div>
                <figcaption>Generated heightmap</figcaption>
              </figure>
            </div>
          </article>
        </div>
      </section>

      <section className="about" id="about">
        <div>
          <p className="eyebrow">About</p>
          <h2>Software built for people who need to use it.</h2>
        </div>
        <div className="about-copy">
          <p>
            My work sits where application architecture meets practical
            production. I enjoy defining clean responsibilities, exposing the
            right controls, and building systems that remain understandable as
            a project grows.
          </p>
          <p>
            I’m currently preparing to apply this approach to Configura Magic
            and CET development: configurable product systems, graphical tools,
            and workflows that support real users over the long term.
          </p>
          <a
            className="text-link"
            href="/Derek-Vieau-Resume.pdf"
            target="_blank"
            rel="noreferrer"
          >
            Read the full résumé <span aria-hidden="true">↗</span>
          </a>
        </div>
      </section>

      <footer>
        <div>
          <strong>Derek Vieau</strong>
          <span>Software developer · Cheboygan, Michigan</span>
        </div>
        <a href="#top">Back to top ↑</a>
      </footer>
    </main>
  );
}
