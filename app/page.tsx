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
          <h1>Streamlining work through systems creation.</h1>
          <p className="hero-intro">
            I’m Derek Vieau, a software developer building an independent,
            systems-driven simulation game in Unity. The work on display here
            grew from that project: its runtime architecture, map-building tools,
            and asset workflows are designed to make a large project faster to
            author and easier to maintain.
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

        <aside className="hero-system" aria-label="How the Unity project fits together">
          <p className="diagram-label">One Unity project, designed in layers</p>
          <div className="hero-node hero-node-main">
            <span>Reusable core</span>
            <strong>Simulation framework</strong>
          </div>
          <div className="hero-branches" aria-hidden="true">
            <span />
            <span />
            <span />
          </div>
          <div className="hero-node-row">
            <div className="hero-node">
              <span>World authoring</span>
              <strong>Map tools</strong>
            </div>
            <div className="hero-node">
              <span>Runtime</span>
              <strong>Game systems</strong>
            </div>
            <div className="hero-node">
              <span>Production</span>
              <strong>Asset workflows</strong>
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
          <p className="eyebrow">Featured Systems</p>
          <h2>Connected systems for an evolving project.</h2>
          <p>
            Each system grew from a concrete need in the project, with
            some intended to cut down on tedius tasks, and others as
            core features of the game. Reusable logic stays separate from its
            editor or production surface, allowing the game and its workflows to
            grow together.
          </p>
        </div>

        <article className="project project-featured">
          <div className="project-copy">
            <p className="project-number">01 · User-centric spline graphs</p>
            <h3>Building Roads</h3>
            <p className="project-lead">
              The spline editor makes route-building quick for not only me,
              but for anyone that uses it – whether they have knowledge of
              the system or not. with common-sense hotkeys and road types that
              can be swapped without rebuilding the route. The end result of the
              system is a quick-to-learn and visually accessible road creation
              tool.
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
                  The splines respond smoothly to height adjustment. Next task:
                  Hill Generation!
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
              The project’s inventory is divided by responsibility: shared
              definitions describe item types, a small interface defines
              container behavior, and each stack owns its quality- and
              flag-aware runtime state. Consumers observe changes through events
              instead of reaching into the storage implementation.
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
                To populate the Unity project efficiently, custom Blender
                extensions batch-create paper-like or voxel-style 3D assets from
                pixel-art PNGs while keeping pixel sizes consistent. Multiple
                tools have been created to achieve these results, including
                extensions that allow these objects to be folded without ruining
                their topologies, to have pieces of them replaced on command, and
                to change their 'skins' (source image) for quick object variety.
                A custom batch exporter gives the user configurable Unity export
                options for merging, modifiers, baking, and other preparations.
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
                  The fireplace in the demonstration begins as this compact
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
                A custom Lua extension generates heightmaps from the project’s pixel-art
                sprites so they can respond to scene lighting and cast dynamic
                shadows, without the extra time required to hand-paint height
                information for every asset.
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
          <h2>One project, built from connected systems.</h2>
        </div>
        <div className="about-copy">
          <p>
            This work comes from an independent Unity simulation game I’ve
            been developing over time. Building the game also means building the
            tools around it: faster map authoring, consistent 3D asset
            production, lighting-aware sprites, and runtime systems that remain
            understandable as the project grows. Sometimes, that's where I find the most
            enjoyment: in creating the systems that help to create the game.
          </p>
          <p>
            That combination of object-oriented systems, graphical editor tools,
            and repeatable production workflows is what I’m prepared to bring
            to Configura Magic and CET development.
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
